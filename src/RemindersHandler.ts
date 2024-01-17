import Reminder from './Reminder';

/**
 * A grouping of reminders based on tag (case-insensitive)
 */
export interface RemindersGroupingByTag {
    [tag: string]: Reminder[];
}

/**
 * @class RemindersHandler
 * @description Represents a handler that manages a list of reminders
 */
export default class RemindersHandler {
    private _reminders: Reminder[];

    /**
     * Creates a new RemindersHandler instance with no reminders.
     */
    constructor() {
        this._reminders = [];
    }

    /**
     * Returns the list of reminders added so far.
     */
    public get reminders(): Reminder[] {
        return this._reminders;
    }

    /**
     * Creates a new reminder and adds it to list of reminders.
     * @param description - The full description of reminder
     * @param tag - The keyword used to help categorize reminder
     */
    public addReminder(description: string, tag: string, isCompleted: boolean): void {
        const reminder = new Reminder(description, tag, isCompleted = false);
        this._reminders.push(reminder);
    }

    /**
     * Returns the reminder at specified index.
     * @throws ReminderError if specified index is not valid
     * @param index - The index of the reminder
     */
    public getReminder(index: number): Reminder {
        if (!this.isIndexValid(index)) {
            throw new Error(`Reminder Error: Specified index is not valid`);
        }
        return this._reminders[index];
    }

    /**
     * Returns true if specified index is valid, false otherwise.
     * @param index - The position of the reminder in list of reminders
     */
        public isIndexValid(index: number): boolean {
        if (this.size() === 0) return false;
        if (index < 0 || index + 1 > this.size()) return false;
        return true;
    }

    /**
     * Returns the number of reminders added so far.
     */
    public size(): number {
        return this._reminders.length;
    }

    /**
     * Modifies the description of the reminder at a specified index.
     * Silently ignores call if index is not valid.
     * @param index - The index of the reminder
     * @param description - The full description of reminder
     * @param tag - The keyword used to help categorize reminder
     */
    public modifyReminder(index: number, description: string): void {
        console.log("BEFORE: ", this._reminders);

        // if (index < 0 || index >= this._reminders.length) {
        //     console.log("Index out of bounds");
        //     return;
        // }

        const reminderToUpdate = this._reminders[index];
        console.log("reminderToUpdate: ", reminderToUpdate);
    
        this._reminders[index].description = description;
    
        console.log("AFTER: ", this._reminders);
    }
    
    /**
     * Toggle the completion status of the reminder at specified index.
     * Silently ignores call if index is not valid.
     * @param index - The index of the reminder
     */
    public toggleCompletion(index: number): void {
        if (index < 0 || index >= this.reminders.length) return;
        let reminder = this.reminders[index];
        reminder.toggleCompletion();
    }

    /**
     * Returns a list of reminders that match the keyword
     * All reminders with tags that match the search keyword exactly will be returned first.
     * If none exist, then all reminders with descriptions that match the search keyword (even partially)
     * are returned.
     * @param keyword - Text to search for in description and tag
     */
    public search(keyword: string): Reminder[] {
        const lowercase = keyword.toLowerCase();
        let results = this.searchTags(lowercase);
        if (results.length === 0) {
            results = this.searchDescriptions(lowercase);
        }
        return results;
    }

    /**
     * Returns a grouping of the reminders based on tag (case-insensitive).
     */
     public groupByTag(): RemindersGroupingByTag {
        const groupings: RemindersGroupingByTag = {};
    
        for (const reminder of this._reminders) {
            const tag = reminder.tag;
    
            if (!groupings[tag]) {
                groupings[tag] = [];
            }
    
            groupings[tag].push(reminder);
        }
    
        return groupings;
    }
    

    /**
     * Returns a list of reminders with tags that match the keyword exactly.
     * @param keyword - Text to search for in description and tag
     */
    private searchTags(keyword: string): Reminder[] {
        return this._reminders.filter(reminder => reminder.tag.toLowerCase() === keyword);
    }

    /**
     * Returns a list of reminders with descriptions that match the keyword.
     * @param keyword - Text to search for in description and tag
     */
    private searchDescriptions(keyword: string): Reminder[] {
        return this._reminders.filter(reminder => reminder.description.toLowerCase().includes(keyword));
    }
}
