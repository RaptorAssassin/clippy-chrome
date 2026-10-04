/**
 * Normalizes the website hostname by removing subdomains, protocols, ports etc., for example: "https://www.gist.github.com/anything" -> "github.com"
 * @param {*} input - The input hostname to normalize 
 * @returns The normalized hostname, or an empty string if the input is invalid
 */
function normalizeHostname(input) {
    if (typeof input !== 'string' || !input) return ''
    let host = input.toLowerCase().trim()
    const match = host.match(/^(?:[a-z][a-z0-9+.-]*:\/\/)?([^/:?#]+)/)
    if (match) host = match[1]
    if (host.startsWith('[')) {
        const end = host.indexOf(']')
        return end !== -1 ? host.slice(1, end) : host
    }
    host = host.split(':')[0]
    host = host.replace(/^\.+|\.+$/g, '')
    host = host.replace(/^www\./, '')
    if (!host) return ''
    if (host === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || !host.includes('.')) return host
    const base = host.match(/([^.]+\.[^.]+)$/)
    return base ? base[1] : host
}