const queries = []
queries.push({
  label: 'vue',
  query: ['vue', '+', 'vuejs'],
  color: '#4fc08d',
  hidden: false,
  rows: []
})

queries.push({
  label: 'react',
  query: ['react'],
  color: '#61dafb',
  hidden: false,
  rows: []
})

queries.push({
  label: 'angular',
  query: ['angular', '+', 'angularjs'],
  color: '#b52e31',
  hidden: false,
  rows: []
})

queries.push({
  label: 'javascript',
  query: ['javascript', '+', ' js'],
  color: '#F2DD4F',
  hidden: true,
  rows: []
})

queries.push({
  label: 'nodejs',
  query: ['nodejs', '+', 'node.js'],
  color: '#43853d',
  hidden: true,
  rows: []
})

queries.push({
  label: 'remote',
  query: ['remote', '-', 'not remote', '-', 'no remote'],
  color: '#953255',
  hidden: true,
  rows: []
})

queries.push({
  label: 'aws',
  query: ['aws'],
  color: '#ff9d00',
  hidden: true,
  rows: []
})

queries.push({
  label: 'blockchain',
  query: ['ethereum', '+', 'blockchain', '+', 'bitcoin', '+', 'solidity', '+', 'smart contract'],
  color: '#102026',
  hidden: true,
  rows: []
})

queries.push({
  label: 'java',
  query: ['java', '-', 'javascript'],
  color: '#007396',
  hidden: true,
  rows: []
})

queries.push({
  label: 'python',
  query: ['python'],
  color: '#ffd343',
  hidden: true,
  rows: []
})

queries.push({
  label: 'golang',
  query: ['golang'],
  color: '#E0EBF5',
  hidden: true,
  rows: []
})

module.exports.queries = queries
