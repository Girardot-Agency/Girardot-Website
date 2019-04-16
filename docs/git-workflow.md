# Git workflow

## Branches

- 'master': active development (merges into 'release/\*') -- merges: (from) 'feature/\*' (to) 'release/\*'.
- 'feature/\*': features under active development -- merges: (from) n/a (to) 'master'
- 'release/\*': archive of releases for staging -- merges: (from) 'master' (to) 'deploy/public'.
- 'deploy/public': used for production build -- merges: (from) 'master' (to) 'deploy/public'.
