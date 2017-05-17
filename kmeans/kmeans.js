function classify(items, centroids, filter = null) {
  const clusters = centroids.map(() => []);

  items.forEach(item => {
    const distances = centroids.map(centroid => Math.abs(item.length - centroid));
    const cluster_index = distances.indexOf(Math.min(...distances));

    clusters[(filter) ? filter(cluster_index, item) : cluster_index].push(item);
  });
  
  return clusters;
}

function mean(items) {
  if (!items.length) return null;
  return items.reduce((sum, item) => sum + item.length, 0) / items.length;
}

function kmeans(data, centroids, iterations = Number.MAX_VALUE) {
  //var clusters = null, moved = false;
  
  do {
    const clusters = classify(data, centroids, (index, item) => (index === 2 && item[0] === '1') ? 1 : index);
    for (let i = 0, m; i < clusters.length; i++) {
      cluster_mean = mean(clusters[i]);
      if (centroids[i] !== cluster_mean) {
        centroids[i] = cluster_mean;
        moved = true;
        continue;
      }
      moved = false;
    }
  }
  while (iterations-- && moved)

  return { clusters: clusters, centroids: centroids }
}

function decodeBitsAdvanced(bits){
    var map = {};
    var bits = bits.replace(/^0+|0+$/g, '').match(/1+|0+/g);
    if (!bits) return '';
    
    var result = kmeans(bits, [1,3,7], 100);
    var clusters = result.clusters; 
    var averages = [
    	(Math.max(...clusters[0].map(item => item.length)) + Math.min(...clusters[0].map(item => item.length))) / 2,
    	(Math.max(...clusters[1].map(item => item.length)) + Math.min(...clusters[1].map(item => item.length))) / 2,
    	(Math.max(...clusters[2].map(item => item.length)) + Math.min(...clusters[2].map(item => item.length))) / 2,
    ]

    var centroids = [
    	(averages[0] + averages[1]) / 2 || averages[0] || averages[1],
    	(averages[1] + averages[2]) / 2 || averages[1] || averages[0] * 3,
    ]

    bits.reduce((map, signal) => {
      signal = signal.length;

      if (signal <= centroids[0]) {
        map['1'.repeat(signal)] = '.';
        map['0'.repeat(signal)] = '';
      }

      else if (signal <= centroids[1]) {
        map['1'.repeat(signal)] = '-';
        map['0'.repeat(signal)] = ' ';
      }

      else if (signal > centroids[1]) {
        map['1'.repeat(signal)] = '-';
        map['0'.repeat(signal)] = '   ';
      }

      return map;
    }, map)
    
    return bits.map(signal => {
      return map[signal];
    }).join('');
}

function decodeMorse(morseCode){
    if (!morseCode.length) return '';
    return morseCode.split('   ').map(word => {
      return word.trim().split(' ').map(code => {
        return MORSE_CODE[code] || code
      }).join('');
    }).join(' ');
}

module.exports.classify = classify;
module.exports.mean = mean;
module.exports.kmeans = kmeans;
module.exports.decodeBitsAdvanced = decodeBitsAdvanced;
module.exports.decodeMorse = decodeMorse;


//bits = bits.replace(/^0*/, '').replace(/0*$/, '');
//    var ones = bits.match(/11*/g);
//    var max = Math.max.apply(null, ones.map(item => item.length));
//    var min = Math.min.apply(null, bits.match(/11*|00*/g).map(item => item.length));
//    if (max !== min) max = Math.ceil(max / 3);
  
//    return bits.match(/11*|00*/g).map(item => {
//      if (item[0] === '1') return (item.length <= max) ? '.' : '-';
//      if (item[0] === '0') return (item.length <= max) ? '' : (item.length > max * 3) ? '   ' : ' ';
//    }).join('');