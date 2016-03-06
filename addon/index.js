import EmberWeakMap from './weak-map';

export default typeof WeakMap !== 'undefined' ? WeakMap : EmberWeakMap;
