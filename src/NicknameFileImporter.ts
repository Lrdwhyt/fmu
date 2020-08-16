interface NicknameEntry {
    player: string;
    nicknames: string[];
}

export function parseNicknameFile(data: string): NicknameEntry[] {
    const dataArr = data.split("\n");
    const result: NicknameEntry[] = [];

    let currentNicknames: string[] = [];
    let isEndOfNicknames: boolean = false;
    for (const line of dataArr) {
        if (line === "") {
            continue;
        }

        if (line === "=") {
            isEndOfNicknames = true;
            continue;
        }

        if (isEndOfNicknames) {
            let entry: NicknameEntry = {
                player: line,
                nicknames: currentNicknames
            }
            result.push(entry);
            currentNicknames = [];
            isEndOfNicknames = false;
            continue;
        }

        if (line === "0") {
            break;
        }

        currentNicknames.push(line);
    }

    return result;
}