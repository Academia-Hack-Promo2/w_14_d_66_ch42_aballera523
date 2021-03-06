Rails.application.routes.draw do
  #resources :categories do
  #  resources :tasks 
  #end
  get 'tasks' => 'tasks#index'
  post 'tasks' => 'tasks#create'
  put 'tasks/:id' => 'tasks#update'
  put 'tasks/:id/status' => 'tasks#edit_status'
  put 'tasks/:id/priority' => 'tasks#edit_priority'
  delete 'tasks/:id' => 'tasks#destroy'
  get 'tasks/:id' => 'tasks#show'

  #resources :tasks

  post 'categories' => 'categories#create'
  get 'categories' => 'categories#index'
  get 'categories/:id/tasks' => 'categories#show_task'
  get 'categories/tasks' => 'categories#list_tasks'
  put 'categories/:id' => 'categories#update'
  delete 'categories/:id' => 'categories#delete'
  get 'categories/:id' => 'categories#show'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
