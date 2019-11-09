defmodule Hippo.GraphQL.Types do
  @moduledoc false
  use Absinthe.Schema.Notation

  import_types(Hippo.GraphQL.Types.Identifier)
  import_types(Hippo.GraphQL.Types.Project)
  import_types(Hippo.GraphQL.Types.Lane)
  import_types(Hippo.GraphQL.Types.Card)
  import_types(Hippo.GraphQL.Types.Event)
end
