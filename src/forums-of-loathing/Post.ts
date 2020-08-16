/*
Element should be of class .page
*/

export function getUsername(el: Element): string {
    const username = el.getElementsByClassName("bigusername")[0];

    if (username.textContent === null) {
        return "";
    }

    return username.textContent;
}

export function getNumber(el: Element): number {
    const parent = el.getElementsByClassName("thead")[1];
    const postNumber = parent.getElementsByTagName("a")[0];

    return parseInt(postNumber.name);
}

export function getId(el: Element): number {
    if (el.firstElementChild === null || el.firstElementChild.firstElementChild === null) {
        return -1;
    }

    const edit = el.firstElementChild.firstElementChild;
    const editId: string = edit.id;
    const id: string = editId.substring(4);

    return parseInt(id);
}

export function getTime(el: Element): string {
    const parent = el.getElementsByClassName("thead")[0];
    let result: string = parent.textContent || "";
    result = result.trim();

    return result;
}

export function getContent(el: Element): string {
    const elements = el.querySelectorAll(".alt1 > div");
    const post: Element = elements[1];
    let content: string = "";
    for (const node of post.childNodes) {
        if (node.nodeName.toLowerCase() === "div") {
            continue;
        }

        content += node.textContent;
    }

    return content.trim();
}

export function getBoldText(el: Element): string[] {
    let result: string[] = [];
    const boldElements = el.querySelectorAll(".alt1 > div > b");
    if (boldElements.length == 0) {
        return []
    }
    for (const boldElement of boldElements) {
        if (boldElement.textContent) {
            //result.push(boldElement.textContent);
        }
        result.push(getRawText(boldElement));
    }

    return result;
}

// convert smileys to the corresponding string
function getRawText(el: Element): string {
    let text: string = "";

    for (const child of el.childNodes) {
        if (child.nodeName.toLowerCase() === "img") {
            switch ((child as HTMLImageElement).title) {
                case "Surprised":
                    text += ":o";
                    break;

                case "Broad Smile":
                    text += ":D";
                    break;

                case "Razz":
                    text += ":p";
                    break;

                case "Mad":
                    text += ":x";
                    break;

                default:
                    break;
            }
        } else {
            text += child.textContent;
        }
    }

    return text;
}