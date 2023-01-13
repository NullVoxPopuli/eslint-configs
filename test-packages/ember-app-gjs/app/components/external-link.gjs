import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';

const DefaultContent = <template>
  <span>{{yield}}</span>

  <FaIcon @icon="external-link-alt" />
</template>


const ExternalLink = <template>
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
</template>


export default ExternalLink;
