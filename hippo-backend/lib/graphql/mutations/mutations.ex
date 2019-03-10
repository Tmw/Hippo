defmodule Hippo.GraphQL.Mutations do
  use Absinthe.Schema.Notation

  import_types(Hippo.GraphQL.Mutations.Lane)
  import_types(Hippo.GraphQL.Mutations.Project)
  import_types(Hippo.GraphQL.Mutations.Card)
end
