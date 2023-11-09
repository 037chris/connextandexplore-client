/**
 * Ergänzen Sie hier die Anbindung an den Server
 */

import { BoardResource, MessageResource } from "../ChannelResources";
import { demoBoard } from "../components/__test__/data";

const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function getBoard(): Promise<BoardResource> {
    /* Ersetzen Sie folgenden Demo-Code durch eine echte Server-Anfrage */
    await new Promise<void>((resolve) => setTimeout(() => { resolve() }, 1000));
    return Promise.resolve(demoBoard);
}

export async function getMessages(channelId: string): Promise<MessageResource[]> {
    throw new Error("Not implemented");
}