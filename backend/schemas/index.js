const fs = require('fs');
const path = require('path');

function readTypeDefsAndResolvers(dir) {
  let typeDefs = [];
  let resolvers = [];

  function readFilesInDir(directory, isResolver) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readFilesInDir(filePath, isResolver);
      } else if (stat.isFile() && (file.toLowerCase().endsWith('.js') || file.toLowerCase().endsWith('.graphql'))) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (isResolver) {
          resolvers.push(require(filePath));
        } else {
          typeDefs.push(content);
        }
      }
    });
  }

  const resolverDir = path.join(dir, 'Resolvers');
  const typeDefDir = path.join(dir, 'TypeDefs');

  if (fs.existsSync(resolverDir)) {
    readFilesInDir(resolverDir, true);
  }

  if (fs.existsSync(typeDefDir)) {
    readFilesInDir(typeDefDir, false);
  }

  return { typeDefs, resolvers };
}

// Provide the root directory containing your typedef and resolver files
const rootDir = path.join(__dirname, '../schemas');
const { typeDefs, resolvers } = readTypeDefsAndResolvers(rootDir);

module.exports = { typeDefs, resolvers };
