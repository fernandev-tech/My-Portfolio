import type { ProjectContentBlock } from "@/lib/projects";
type ContentBlockProps = {
    blocks: ProjectContentBlock[],
}


export function ContentBlocks({ blocks }: ContentBlockProps) {
    return (
        <>
            {blocks.map((block, index) => {
                if (block.format === "title") {
                    return <h3 className="mt-3 text-xl font-semibold text-white" key={index}>{block.content}</h3>

                }
                if (block.format === "paragraph") {
                    return <p className="text-text-secondary mt-2" key={index}>{block.content}</p>

                }
                if (block.format === "list") {
                    return (
                        <ul key={index}>
                            {block.content.map((item, itemIndex) => (
                                <li className="ml-8 text-text-secondary mt-2 list-disc pl-2" key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    )
                }
            })}
        </>
    )
}