defmodule Hippo.GraphQL.Events do
  @moduledoc """
  The structs defined in this modules submodules will be triggered by
  mutations on the graph and will be dispatched via Absinthe Subscriptions.
  They will determine the concrete type of the union types, carrying a relevant payload.
  """

  @doc """
  `public/3` takes a subscription atom, a topic string and a payload.
  Payload is expected to be a submodule of Hippo.GraphQL.Events.
  """
  def publish(subscription, topic, payload)
      when is_atom(subscription) and is_binary(topic) do
    subscription_and_topic = Keyword.put([], subscription, topic)
    Absinthe.Subscription.publish(HippoWeb.Endpoint, payload, subscription_and_topic)
  end
end

defmodule Hippo.GraphQL.Events.Project do
  defmodule Created do
    defstruct [:project]
  end

  defmodule Updated do
    defstruct [:project]
  end

  defmodule Deleted do
    defstruct [:project_id]
  end
end

defmodule Hippo.GraphQL.Events.Lane do
  defmodule Created do
    defstruct [:lane]
  end

  defmodule Updated do
    defstruct [:lane]
  end

  defmodule Deleted do
    defstruct [:lane_id]
  end

  defmodule Repositioned do
    defstruct [:lane_id, :position]
  end
end

defmodule Hippo.GraphQL.Events.Card do
  defmodule Created do
    defstruct [:card, :lane_id]
  end

  defmodule Updated do
    defstruct [:card]
  end

  defmodule Deleted do
    defstruct [:card_id, :lane_id]
  end

  defmodule Repositioned do
    defstruct [:card_id, :source_lane_id, :target_lane_id, :position]
  end
end
