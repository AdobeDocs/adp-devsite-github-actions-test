// FIXME: still a little tricky for metadata checking, need refine logic later
function hasMetadata(content){
    if (!content.startsWith('---')) return false;
    const metadataEnd = content.indexOf("---", content.indexOf("---") + 1);
    const metadata = content.slice(3, metadataEnd + 3).trim();
    return metadata.includes("title") || metadata.includes("description") || metadata.includes("keywords");
}

// doing module export instead of exporting functions directly to avoid "SyntaxError: Unexpected token 'export'" in github actions environment
module.exports = {
    hasMetadata
};