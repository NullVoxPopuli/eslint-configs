// @ts-expect-error - in this test, we did not add this package
import FaIcon from "@fortawesome/ember-fontawesome/components/fa-icon";

import type { TOC } from "@ember/component/template-only";

const DefaultContent: TOC<{ Blocks: { default: [] } }> = <template>
  <span>{{yield}}</span>

  <FaIcon @icon="external-link-alt" />
</template>;

const ExternalLink: TOC<{
  Element: HTMLAnchorElement;
  Blocks: {
    default: [];
    custom: [typeof DefaultContent];
  };
}> = <template>
  <a
    target="_blank"
    rel="noreferrer noopener"
    href="#"
    class="flex gap-2 items-baseline focus:ring-4 focus:outline-none focus-visible:outline-none rounded-sm"
    ...attributes
  >
    {{#if (has-block "default")}}
      <DefaultContent>
        {{yield}}
      </DefaultContent>
    {{else if (has-block "custom")}}
      {{yield DefaultContent to="custom"}}
    {{/if}}
  </a>
</template>;

export default ExternalLink;
