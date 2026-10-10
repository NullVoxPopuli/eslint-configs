import type { TOC } from '@ember/component/template-only';

const InlineStyle: TOC<{ Blocks: { default: [] } }> = <template>
  {{! An unused directive is an error, so this line fails if the template rules are off. }}
  {{! eslint-disable-next-line ember/template-no-inline-styles }}
  <span style="color: red">{{yield}}</span>
</template>;

export default InlineStyle;
