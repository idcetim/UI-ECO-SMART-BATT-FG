export const formatTextToAlert = (text) => {
    const textSeparated = text.split('.')
    if (textSeparated.length === 2) return textSeparated[0]
    return textSeparated.slice(0, textSeparated.length - 1)
}