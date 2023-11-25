export class ErrorFromValidation extends Error {
    param: string | undefined;
    status: number;
    validationErrors: ValidationError[];
    
    private static msg(validationErrors: ValidationError[]): string {
        if (validationErrors.length == 0) {
            return "Unspecified validation error";
        }
        return validationErrors.map((validationError) => {
            return `${validationError.msg} (${validationError.location} ${validationError.param}, value ${validationError.value})`;
        }).join(". ");
    }
    
    constructor(status: number, validationErrors: ValidationError[]) {
        super(ErrorFromValidation.msg(validationErrors));
        this.status = status;
        this.validationErrors = validationErrors;
    }
}

/**
 * ValidationError created by express-validator (without nested errors).
 */
type ValidationError = {
    msg: string;
    param: string;
    location: string;
    value: string;
}

/**
 * function um errors aus der express validation zu bekommen, falls welche aufgetreten sind.
 * funktioniert wie fetch, daten werden mit .json umgewandelt und zurückgegeben
 * @param url 
 * @param init 
 * @returns 
 */
export async function fetchWithErrorHandling<R>(url: string, init?: RequestInit): Promise<R> {
    
    const response: Response = await fetch(url, init);

    const contentType = response.headers.get("Content-Type") ?? "";
    if (contentType.startsWith("application/json")) {
        const data = await response.json()
        if (response.ok) {
            return data;
        }
        if (data.errors instanceof Array) {
            const validationErrors = data.errors as ValidationError[];
            throw new ErrorFromValidation(response.status, validationErrors);
        } else {
            throw new Error(`Status ${response.status}: ${JSON.stringify(data)}`);
        }
    }
    if (response.ok) {
        return undefined as unknown as R;
    }
    throw new Error(`Status ${response.status}`);
    
}