import { EventType, INodeDescriptionEvent } from "../../interface";

const sendEmailEvent: INodeDescriptionEvent = {
  displayName: "Send Email",
  name: "send_email",
  type: EventType.action,
  description: "Create and send a new email",
  fields: [
    {
      displayName: "To",
      name: "sendTo",
      description:
        "Who will this email be sent to? Multiple email addresses can be entered either individually, or as a comma separated list.",
      required: true,
      type: { name: "string", props: {} },
    },
    {
      displayName: "Subject",
      name: "subject",
      required: true,
      type: { name: "string", props: {} },
    },
    {
      displayName: "Body Type",
      name: "bodyType",
      required: true,
      defaultValue: "plain",
      type: { name: "choices", props: {}, },
      options: [
       {label: "Plain", value: "plain"},
       {label: "HTML", value: "html"},
      ],
    },
    {
      displayName: "Body",
      name: "body",
      required: true,
      type: { name: "textarea", props: {} },
    },
  ],
};

export const events: INodeDescriptionEvent[] = [
  sendEmailEvent,
  {
    displayName: "Reply to Email",
    name: "reply_email",
    type: EventType.action,
    description: "Send a reply to an email",
  },
  {
    displayName: "Create Draft",
    name: "create_draft",
    type: EventType.action,
    description: "Create but do not send a new email",
  },
];
