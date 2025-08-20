const matter = require('gray-matter');

function hasMetadata(content){
    try {
        const parsed = matter(content);
        return parsed.matter && parsed.matter.trim().length > 0;
    } catch (_e) {
        return false;
    }
}

function replaceOrPrependFrontmatter(originalContent, newFrontmatterBlock){
    // newFrontmatterBlock should be a full YAML block including leading and trailing ---
    try {
        const parsed = matter(originalContent);
        const body = parsed.content || '';
        if (parsed.matter && parsed.matter.trim().length > 0) {
            // Replace existing frontmatter by reconstructing using gray-matter
            return `${newFrontmatterBlock}\n${body.replace(/^\n+/, '')}`;
        }
        // No frontmatter, prepend
        return `${newFrontmatterBlock}\n${originalContent.replace(/^\n+/, '')}`;
    } catch (_e) {
        // Fallback: naive prepend
        return `${newFrontmatterBlock}\n${originalContent}`;
    }
}

module.exports = {
    hasMetadata,
    replaceOrPrependFrontmatter
};