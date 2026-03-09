// Auto-loads all JSON files from src/data/projects/
// To add a project: create a new .json file in that folder using _template.json as a guide.
// To remove a project: delete its .json file.
// No other code changes needed.

const projectModules = import.meta.glob('./projects/*.json', { eager: true });

const projectsData = Object.entries(projectModules)
    .filter(([path]) => !path.includes('/_'))
    .map(([, mod]) => mod.default)
    .sort((a, b) => a.name.localeCompare(b.name));

export default projectsData;
