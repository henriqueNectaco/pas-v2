module.exports = {
    plugins: ['tailwindcss'],
    tailwindcss: {
      groupByOrder: true,
      purgeLayersByDefault: true,
      separator: '_',
      extendOrder: true,
      optgroups: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      order: [
        'custom-classes',
        'default',
        'layout',
        'typography',
        'background',
        'border',
        'space',
        'color',
      ],
      cssHash: 'css',
    },
  }