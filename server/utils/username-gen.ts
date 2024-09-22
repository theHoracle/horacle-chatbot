function generateBaseUsername(fullName: string, email: string): string {
    const nameParts = fullName.trim().toLowerCase().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    // Use email prefix if last name doesn't exist
    return lastName ? `${firstName}.${lastName}` : email.split("@")[0];
}

function isUsernameUnique(username: string, existingUsernames: Set<string>): boolean {
    return !existingUsernames.has(username);
}

export function generateUniqueUsername(fullName: string, email: string, existingUsernames: Set<string>): string {
    let baseUsername = generateBaseUsername(fullName, email);
    let uniqueUsername = baseUsername;
    let counter = 1;

    // Keep incrementing the counter until a unique username is found
    while (!isUsernameUnique(uniqueUsername, existingUsernames)) {
        uniqueUsername = `${baseUsername}${counter}`;
        counter++;
    }

    // Add the unique username to the existing usernames set
    existingUsernames.add(uniqueUsername);

    return uniqueUsername;
}
