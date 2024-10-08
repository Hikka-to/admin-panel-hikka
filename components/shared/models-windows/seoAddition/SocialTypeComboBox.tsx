"use client";
import React from "react";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";

import { SocialType } from "@/models/Dto/SeoAdditions/social-type";

interface SocialTypeSelectorProps {
  onSelectionChanged: (selectedType: SocialType | null | undefined) => void;
  initialState: SocialType | null | undefined;
}

const SocialTypeSelector: React.FC<SocialTypeSelectorProps> = ({
  onSelectionChanged,
  initialState,
}) => {
  const socialTypes = [
    { key: SocialType.Website, label: "Website" },
    { key: SocialType.Article, label: "Article" },
    { key: SocialType.Book, label: "Book" },
    { key: SocialType.Profile, label: "Profile" },
    { key: SocialType.VideoOther, label: "VideoOther" },
    { key: SocialType.VideoMovie, label: "VideoMovie" },
    { key: SocialType.VideoEpisode, label: "VideoEpisode" },
    { key: SocialType.VideoTvShow, label: "VideoTvShow" },
    { key: SocialType.MusicSong, label: "MusicSong" },
    { key: SocialType.MusicAlbum, label: "MusicAlbum" },
    { key: SocialType.MusicPlaylist, label: "MusicPlaylist" },
    { key: SocialType.MusicRadioStation, label: "MusicRadioStation" },
  ];

  const innerOnSelectionChanged = (keys: SharedSelection) => {
    var arrayKeys = [...keys];

    onSelectionChanged(arrayKeys[0] as SocialType);
  };

  return (
    <Select
      className="max-w-xs"
      defaultSelectedKeys={[initialState?.toString() as string]}
      items={socialTypes}
      label="Select the social type"
      placeholder="Select the social type"
      onSelectionChange={innerOnSelectionChanged}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
};

export default SocialTypeSelector;
