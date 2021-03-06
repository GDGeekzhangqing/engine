/**
 * @hidden
 */

import { BaseNode } from './base-node';
import { replaceProperty, removeProperty } from '../utils/deprecated';
import { Layers } from './layers';
import { Node } from './node';

replaceProperty(BaseNode.prototype, 'BaseNode', [
    {
        'name': 'childrenCount',
        'newName': 'children.length',
        'customGetter': function (this: BaseNode) {
            return this.children.length;
        }
    }
]);

removeProperty(Node.prototype, 'Node.prototype', [
    {
        'name': 'addLayer',
    },
    {
        'name': 'removeLayer',
    }
]);

removeProperty(Layers, 'Layers', [
    {
        'name': 'All',
    },
    {
        'name': 'RaycastMask',
    },
    {
        'name': 'check',
    }
]);

replaceProperty(Layers, 'Layers', [
    {
        name: 'Default',
        newName: 'DEFAULT',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'Always',
        newName: 'ALWAYS',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'IgnoreRaycast',
        newName: 'IGNORE_RAYCAST',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'Gizmos',
        newName: 'GIZMOS',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'Editor',
        newName: 'EDITOR',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'UI',
        newName: 'UI_3D',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'UI2D',
        newName: 'UI_2D',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'SceneGizmo',
        newName: 'SCENE_GIZMO',
        target: Layers.Enum,
        targetName: 'Layers.Enum',
    },
    {
        name: 'makeInclusiveMask',
        newName: 'makeMaskInclude',
        target: Layers,
        targetName: 'Layers',
    },
    {
        name: 'makeExclusiveMask',
        newName: 'makeMaskExclude',
        target: Layers,
        targetName: 'Layers',
    },
]);

removeProperty(Layers.Enum,'Layers.Enum',[
    {
        'name': 'ALWAYS',
    }
]);

removeProperty(Layers.BitMask,'Layers.BitMask',[
    {
        'name': 'ALWAYS',
    }
]);
