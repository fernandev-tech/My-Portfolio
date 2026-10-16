import type { ProjectContentBlock } from "@/lib/projects";
type ContentBlockProps = {
    blocks: ProjectContentBlock[],
}


export function ContentBlocks({ blocks }: ContentBlockProps) {
    return (
        <>
            {blocks.map((block, index) => {
                if (block.format === "title") {
                    return <h3 key={index}>{block.content}</h3>

                }
                if (block.format === "paragraph") {
                    return <p key={index}>{block.content}</p>

                }
                if (block.format === "list") {
                    return (
                        <ul key={index}>
                            {block.content.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    )
                }
            })}
        </>
    )
}