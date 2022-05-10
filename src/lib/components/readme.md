# Component Library

Where Svelte files that render content live. Components are organized into a hierarchy.

Tokens -> Atoms -> Molecules -> Organisms -> Widgets

To see the full component library, run:

```sh
npm run storybook
```

## Tokens

Tokens aren't actually components, but rather things that define components. Generally controlled through CSS variables. Things like:

- Fonts
- Colors
- Icons
- Gutters
- Grid sizes

## Atoms

Atoms are bite-size reusable components; form elements, buttons, spacing elements, etc.

If it's small and abstract like a token but includes markup, it's an atom.

## Molecules

Components that are composed of multiple atoms but don't necessarily have any sort of internal state or external data dependencies.

Example would be groups of buttons for paginating, pills that contain flags and images and text, form sections, etc.

## Organisms

Components that have some concept of internal state or external data but that cannot be rendered as dashboard elements on their own.

## Widgets

Like organisms, but can be keyed in the configuration to render as dashboard elements.
