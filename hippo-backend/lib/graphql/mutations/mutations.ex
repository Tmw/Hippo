defmodule Hippo.GraphQL.Mutations do
  @moduledoc false
  use Absinthe.Schema.Notation

  import_types(Hippo.GraphQL.Mutations.Lane)
  import_types(Hippo.GraphQL.Mutations.Project)
  import_types(Hippo.GraphQL.Mutations.Card)
end
