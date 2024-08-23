export function getSplittedByWords(text: string) {
    return text.replace(/[_-]/g, " ")
        .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2")
        .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, "$1 $2")
        .split(" ")
        .filter((word) => word.length > 0)
        .map((word) => word.toLowerCase());
}

export function toCamelCase(text: string) {
    const [first, ...other] = getSplittedByWords(text);
    return first.toLowerCase() + other.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

export function toKebabCase(text: string) {
    return getSplittedByWords(text).map((word) => word.toLowerCase()).join("-");
}

export function toSnakeCase(text: string) {
    return getSplittedByWords(text).map((word) => word.toLowerCase()).join("_");
}

export function toPascalCase(text: string) {
    return getSplittedByWords(text).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

export function toTitleCase(text: string) {
    return getSplittedByWords(text).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
