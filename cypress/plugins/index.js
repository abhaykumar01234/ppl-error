const fs = require('fs')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
//   `on` is used to hook into various events Cypress emits
//   `config` is the resolved Cypress config
    on('task', {
        readdir: (folder) => {
            const content = fs.readdirSync(folder)
            return content
        }
    })
};
