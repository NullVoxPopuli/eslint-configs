import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

/**
  `{{page-title}}` helper used to set the title of the current route context.

  @public
  @method page-title
 */
export default class PageTitle extends Helper {
  @service('page-title') tokens;

  get tokenId() {
    return guidFor(this);
  }

  constructor() {
    super(...arguments);
    this.tokens.push({ id: this.tokenId });
  }

  compute(params, _hash) {
    const hash = {
      ..._hash,
      id: this.tokenId,
      title: params.join(''),
    };

    this.tokens.push(hash);
    this.tokens.scheduleTitleUpdate();

    return '';
  }

  willDestroy() {
    super.willDestroy();
    this.tokens.remove(this.tokenId);
    this.tokens.scheduleTitleUpdate();
  }
}
