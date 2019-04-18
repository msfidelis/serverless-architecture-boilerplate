module.exports = () => {  
    const fs = require('fs')
    const files = fs.readdirSync('./handlers')
    const YAML = require('yamljs')  
  
    const merged = files
        .map(f => fs.readFileSync(`./handlers/${f}`, 'utf8'))
        .map(raw => YAML.parse(raw))
        .reduce( (result, handler) => Object.assign(result, handler), {})
  
    return merged
  }