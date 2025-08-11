function hasMetadata(content){
    if (!content.startsWith('---')) return false;
    const metadataEnd = content.indexOf("---", content.indexOf("---") + 1);
    const metadata = content.slice(3, metadataEnd + 3).trim();
    return metadata.includes("title") || metadata.includes("description") || metadata.includes("keywords");
}

module.exports = {
    hasMetadata
};