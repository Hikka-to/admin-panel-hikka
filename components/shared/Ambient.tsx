"use client";

import React, {useEffect, useRef} from "react";
import html2canvas from 'html2canvas';
import {getRealImageSize} from "@/utils/ImageUtils";

export enum AmbientSize {
    sm = "m-[24px]",
    md = "m-[32px]",
    lg = "m-[48px]",
    xl = "m-[64px]",
    "2xl" = "m-[80px]",
    "3xl" = "m-[96px]",
}

enum BlurSize {
    sm = "blur-[12px]",
    md = "blur-[16px]",
    lg = "blur-[24px]",
    xl = "blur-[32px]",
    "2xl" = "blur-[40px]",
    "3xl" = "blur-[48px]",
}

interface AmbientProps {
    children: React.ReactNode;
    ambientSize?: AmbientSize;
}

enum CanvasType {
    First,
    Second
}

const Ambient: React.FC<AmbientProps> = ({ children, ambientSize = AmbientSize.lg }) => {
    const blur = BlurSize[Object
        .keys(AmbientSize)
        .find(k => AmbientSize[k as keyof typeof AmbientSize] == ambientSize) as keyof typeof BlurSize];
    
    const contentRef = useRef<HTMLDivElement>(null);
    const firstCanvas = useRef<HTMLCanvasElement>(null);
    const secondCanvas = useRef<HTMLCanvasElement>(null);
    const [selectedCanvas, setSelectedCanvas] = React.useState<CanvasType>(CanvasType.First);
    const [transitionedCanvas, setTransitionedCanvas] = React.useState<CanvasType>(CanvasType.First);

    useEffect(() => {
        (async () => {
            const content = contentRef.current!;
            
            if (![...content.querySelectorAll("*")].find(e => e == document.fullscreenElement)) {
                const canvas = selectedCanvas === CanvasType.First ? secondCanvas : firstCanvas;
                const ctx = canvas.current?.getContext("2d", { willReadFrequently: true });
                const result = await html2canvas(content, {useCORS: true, allowTaint: true});
                const width = content.clientWidth;
                const height = content.clientHeight;
                canvas.current!.width = width;
                canvas.current!.height = height;
                ctx?.drawImage(result, 0, 0, width, height);

                const data = ctx?.getImageData(0, 0, width, height);
                const {
                    top,
                    left,
                    width: resultWidth,
                    height: resultHeight
                } = getRealImageSize(width, height, data!.data);
                if (resultWidth > 0) {
                    const resultData = ctx?.getImageData(left, top, resultWidth, resultHeight);
                    canvas.current!.width = resultWidth;
                    canvas.current!.height = resultHeight;
                    ctx?.putImageData(resultData!, 0, 0);
                }
            }
                    
            setSelectedCanvas(selectedCanvas === CanvasType.First ? CanvasType.Second : CanvasType.First);
        })();
    }, [transitionedCanvas])

    useEffect(() => {
        const currentCanvas = selectedCanvas === CanvasType.First ? firstCanvas : secondCanvas;
        const transitionedHandler = () => {
            setTransitionedCanvas(selectedCanvas);
            currentCanvas.current?.removeEventListener("transitionend", transitionedHandler);
        }
        currentCanvas.current?.addEventListener("transitionend", transitionedHandler);
    }, [selectedCanvas]);
    
    return (
        <div className={`${ambientSize} relative overflow-visible`}>
            <canvas className={
                `${blur} absolute w-full h-full top-0 left-0 transition-opacity ease-linear duration-[1s]` +
                (selectedCanvas === CanvasType.First ? " opacity-100" : " opacity-0")
            } ref={firstCanvas} />
            <canvas className={
                `${blur} absolute w-full h-full top-0 left-0 transition-opacity ease-linear duration-[1s]` +
                (selectedCanvas === CanvasType.Second ? " opacity-100" : " opacity-0")
            } ref={secondCanvas} />
            <div className="relative" ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default Ambient;