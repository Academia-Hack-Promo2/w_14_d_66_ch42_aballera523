class CategoriesController < ApplicationController
  def create 
    categories = Category.new(permit)
    if categories.valid?
      categories.save
      render json: categories, :except => [:created_at, :updated_at]
    else
      render json: categories.errors
    end
  end
	def list
		categories = Category.all 
		if categories == nil
			render json:  {"error" => "No hay categorias que listar"}
    else
      render json: categories, :except => [:created_at, :updated_at]
    end   
	end
	def show_task
		if Category.exists?(params[:id])
	    	categories = Category.find(params[:id])
	    	render json: {category: categories, task: categories.tasks}, :except => [:created_at, :updated_at, :category_id]
		else
			render json: "No existe la categoria"
		end
	end
	def list_tasks
		categories = Category.includes(:tasks) 
		render json: {category: categories}, :include => [:tasks], :except => [:created_at, :updated_at, :category_id]
	end 
	private
		def permit
			params.permit(:name)
		end
end


