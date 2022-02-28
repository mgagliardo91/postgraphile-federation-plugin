/**
 * These helpers help us to construct AST nodes required for Apollo Federation's printSchema to work.
 */

import type {
  ArgumentNode,
  DirectiveNode,
  NameNode,
  ObjectTypeDefinitionNode,
  StringValueNode,
} from "graphql";

import {
  Kind
} from "graphql"

/**
 * Construct AST `name` node required for Apollo Federation's printSchema.
 * @param value The value.
 * @returns The AST name node.
 */
export function Name(value: string): NameNode {
  return {
    kind: Kind.NAME,
    value,
  };
}

/**
 * Construct AST `StringValue` node required for Apollo Federation's printSchema.
 * @param value The value.
 * @param block A value indicating whether or not to block.
 * @returns The AST `stringValue` node.
 */
export function StringValue(value: string, block = false): StringValueNode {
  return {
    kind: Kind.STRING,
    value,
    block: block,
  };
}

/**
 * Construct AST `ObjectTypeDefinition` node required for Apollo Federation's printSchema.
 * @param spec The field specification.
 * @returns The AST `ObjectTypeDefinition` node.
 */
export function ObjectTypeDefinition(spec: {
  name: string;
  description?: string | null;
}): ObjectTypeDefinitionNode {
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: Name(spec.name),
    description: spec.description
      ? StringValue(spec.description, true)
      : undefined,
    directives: [],
  };
}

/**
 * Construct AST `Directive` node required for Apollo Federation's printSchema.
 * @param name The GraphQL directive.
 * @param args The directive args.
 * @returns The AST `Directive` node.
 */
export function Directive(
  name: string,
  args: { [argName: string]: unknown } = {},
): DirectiveNode {
  return {
    kind: Kind.DIRECTIVE,
    name: Name(name),
    arguments: Object.entries(args).map(
      ([argName, value]) =>
        ({
          kind: "Argument",
          name: Name(argName),
          value,
        } as ArgumentNode),
    ),
  };
}
