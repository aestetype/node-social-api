export function checkValidConfig(fields: [string], config: any) {
  fields.forEach((field) => {
    if (!config[field]) {
      throw new Error(`No ${field} provided`);
    }
  });
}
