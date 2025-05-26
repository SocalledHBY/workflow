import { getTimeModule } from "./modules/getTimeModule";
import { generateTxtFileModule } from "./modules/generateTxtFileModule";
import { getWeatherModule } from "./modules/getWeatherModule";

export interface Task {
    mid: number;
    input?: any;
}

function getModule(mid: number) {
    if (mid === 1) {
        return getTimeModule;
    } else if (mid === 2) {
        return getWeatherModule;
    } else if (mid === 3) {
        return generateTxtFileModule;
    } else {
        return null;
    }
}

export class TaskManager {
    private taskList: Task[] = [];

    constructor(taskList: Task[]) {
        this.taskList = taskList;
    }

    doTask() {
        if (this.taskList.length === 0) {
            return null;
        }

        let output = this.taskList[0].input;
        for (let i = 0; i < this.taskList.length; i++) {
            const module = getModule(this.taskList[i].mid);
            if (module === null) {
                return null;
            }
            
            output = module(output);
        }
        return output;
    }
}
