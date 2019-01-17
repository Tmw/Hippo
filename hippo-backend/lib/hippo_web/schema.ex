defmodule HippoWeb.Schema do
  use Absinthe.Schema
  alias Hippo.Projects

  query do
    # query all projects
    field :projects, list_of(:project) do
      resolve fn _, _, _ ->
        {:ok, Projects.list_projects()}
      end
    end
  end

  object :project do
    field :id, :id
    field :name, :string
  end
end
