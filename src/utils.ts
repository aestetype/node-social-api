export function checkValidConfig(fields: [string], config: any) {
  // tslint:disable-next-line
  fields.forEach(field => {
    if (!config[field]) {
      throw new Error(`No ${field} provided`);
    }
  });
}
