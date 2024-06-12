import * as path from "node:path";
// Learn more https://docs.expo.dev/guides/monorepos
import { getDefaultConfig } from "expo/metro-config";
import { FileStore } from "metro-cache";

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// #1 - Watch all files in the monorepo
config.watchFolders = [workspaceRoot];
// #2 - Try resolving with project modules first, then workspace modules
// @ts-expect-error - this is safe
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];

// Use turborepo to restore the cache when possible
// @ts-expect-error - this is safe
config.cacheStores = [
	new FileStore({
		root: path.join(projectRoot, "node_modules", ".cache", "metro"),
	}),
];

module.exports = config;
