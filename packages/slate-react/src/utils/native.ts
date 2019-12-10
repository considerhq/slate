import { Editor, Operation } from 'slate'

export const AS_NATIVE: WeakMap<Editor, boolean> = new WeakMap()
export const NATIVE_OPERATIONS: WeakMap<Editor, Operation[]> = new WeakMap()

/**
 * `asNative` queues operations as native, meaning native browser events will
 * not have been prevented, and we need to flush the operations
 * after the native events have propogated to the DOM.
 * @param {Editor} editor - Editor on which the operations are being applied
 * @param {callback} fn - Function containing .exec calls which will be queued as native
 */
export const asNative = (editor: Editor, fn: () => void) => {
  AS_NATIVE.set(editor, true)
  fn()
  AS_NATIVE.set(editor, false)
}
