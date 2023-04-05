import type {
  MessagingPayload,
  MessagingTopicResponse,
  MessagingTopicManagementResponse,
} from "firebase-admin/messaging";
import useFcm from "./useFcm";

export default function () {
  const { getRegistrationToken } = useFcm();

  function send(args: {
    topic: string;
    payload: MessagingPayload;
    authorization?: string;
  }): Promise<MessagingTopicResponse> {
    return $fetch<MessagingTopicResponse>("/api/fcm/topic/send", {
      method: "POST",
      body: {
        topic: args.topic,
        payload: args.payload,
      },
      headers: {
        Authorization: args.authorization || "",
      },
    });
  }

  async function subscribe(args: {
    topic: string;
    authorization?: string;
  }): Promise<MessagingTopicManagementResponse> {
    const token = await getRegistrationToken();

    return $fetch<MessagingTopicManagementResponse>(
      "/api/fcm/topic/subscribe",
      {
        method: "POST",
        body: {
          token: token,
          topic: args.topic,
        },
        headers: {
          Authorization: args.authorization || "",
        },
      }
    );
  }

  async function unsubscribe(args: {
    topic: string;
    authorization?: string;
  }): Promise<MessagingTopicManagementResponse> {
    const token = await getRegistrationToken();

    return $fetch<MessagingTopicManagementResponse>(
      "/api/fcm/topic/unsubscribe",
      {
        method: "POST",
        body: {
          token: token,
          topic: args.topic,
        },
        headers: {
          Authorization: args.authorization || "",
        },
      }
    );
  }

  return { send, subscribe, unsubscribe, getRegistrationToken };
}
