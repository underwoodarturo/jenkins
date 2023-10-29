import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { GeneratorGeneratorSchema } from './schema';

export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema
) {
  const projectRoot = `automations/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  updateJson(tree, 'package.json', (pkgJson) => {
    pkgJson.scripts = pkgJson.scripts ?? {};
    
    pkgJson.scripts[`automation:${options.name}`] = `nx e2e ${options.name} --ui`;
    
    return pkgJson;
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default generatorGenerator;
