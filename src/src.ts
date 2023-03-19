import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class KillAny implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        // Get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get all the in-memory json found in /assets/database
        const tables = databaseServer.getTables();

        // Set the quests variable
        const quests = tables.templates.quests;
        
        // Set the index variable
        let index = 0;
        index++; // return value of index and increment index by one

        // Kill Any instead of Kill Savage or Kill PMC
        for (const quest in quests)
        {
            if (quests[quest].type == "Elimination")
            {
                const kills = quests[quest].conditions.AvailableForFinish.find(x => x._props.counter.conditions[index]._parent["Kills"]);
                let target = kills._props.target;
                target = "KillAny";
            }
        }

        /* Partial credit for wrong type of Kills
        for (const quest in quests)
        {
            if (quests[quest].type == "Elimination")
            {
                const savage = quests[quest].conditions.AvailableForFinish.find(x => x._props.counter.conditions[index]._parent["Kills"]._props.target = "Savage");
                const pmc = quests[quest].conditions.AvailableForFinish.find(x => x._props.counter.conditions[index]._parent["Kills"]._props.target = "AnyPmc")
                if (savage)
                {
                    const scav = quests[quest].conditions.AvailableForFinish.find(x => x._props.counter.conditions[index]);
                    scav.concat(..._parent = "Kills", )
                }
                else if (pmc)
                {
                    
                }
            }
        }*/
    }
}

module.exports = { mod: new KillAny() }