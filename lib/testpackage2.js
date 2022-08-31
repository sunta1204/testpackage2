'use babel';

import Testpackage2View from './testpackage2-view';
import { CompositeDisposable } from 'atom';

export default {

  testpackage2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testpackage2View = new Testpackage2View(state.testpackage2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testpackage2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'testpackage2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testpackage2View.destroy();
  },

  serialize() {
    return {
      testpackage2ViewState: this.testpackage2View.serialize()
    };
  },

  toggle() {
    console.log('Testpackage2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
