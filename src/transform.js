class TagTransformer {
  static customTagMap () {
    return {
      __UNKNOWN: 'Unknown',
      __NA: 'NA',
      __PENDING: 'Pending',
      __INFANT: 'Infant',
      __CREW: 'CC',
      __PILOT: 'Pilot'
    };
  }

  static isCustomTag (str) {
    return str in TagTransformer.customTagMap();
  }

  static isUnknownOrNA (str) {
    return str === '__UNKNOWN' || str === '__NA';
  }

  static customTagToDesc (str) {
    return TagTransformer.customTagMap()[str];
  }

  static descToCustomTag (str) {
    return '__' + str.toUpperCase();
  }
}

const transform = (txt) =>
  txt
    .replace(/[\r\n]+/gm, '')
    .replace(/→/g, ' → ')
    .replace(/[Cc]lass/gm, '')
    .replace(/[Ee]conomy/gm, '')
    .replace(/[Bb]usiness/gm, '')
    .replace(/[Ff]irst/gm, '')
    .replace(/[Uu]nknown/g, '__UNKNOWN')
    .replace(/\b[Nn][Aa]\b/g, '__NA')
    .replace(/[Pp]ending/g, '__PENDING')
    .replace(/\b[Ii]nfant\b/g, '__INFANT')
    .replace(/\b([Cc]abin[\s\r\n]+|[Aa]ir)?[\s\r\n]?[Cc]rew\b/g, '__CREW')
    .replace(/(P[\s\r\n]+ilo[\s\r\n]+t)/, 'Pilot')
    .replace(/[Pp]ilot/g, '__PILOT')
    .replace(/\bTok\syo\b/g, 'Tokyo')
    .replace(/(M[\s\r\n]+a[\s\r\n]+nila)/g, 'Manila')
    .replace(/(K[\s\r\n]+uala)/g, 'Kuala')
    .replace(/\Band/, '')
    .replace(/and\s\s/, '')
    .replace(/, then/g, '')
    .replace(/(\(infant[\s\r\n]+bassinet\))/g, '')
    .replace(/,/g, '')
    .replace(/(Row)[\s\r\n]+(\d+)/g, '$1$2');

module.exports = {
  TagTransformer,
  transform
};
