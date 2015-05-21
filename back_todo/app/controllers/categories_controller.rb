class CategoriesController < ApplicationController
  def create 
    categories = Category.new(permit)
    if categories.valid?
      categories.save
      render json: categories, :except =>[:created_at, :updated_at]
    else
      render json: categories.errors
    end
  end
  def update
    if Category.exists?(params[:id].to_i)
      valid = Category.find(params[:id])
      valid = Category.update(params[:id],permit)
      render json: valid , :except =>[:created_at, :updated_at]
    else
      render json:  {"error"=> "La Categoria no Existe"}
    end 
  end

	def index
    categories = Category.all
    existe = Category.exists?
    if existe 
      render json: categories, :except =>[:created_at, :updated_at]
    else
      render json: {"mensaje" => "No hay categorias que listar"}
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
		render json: categories, :except =>[:created_at, :updated_at], :include => [:tasks => {:except =>[:created_at, :updated_at, :category_id]}]
	end 

	def show
		if Category.exists?(params[:id])
			render json: Category.find(params[:id]), :except =>[:created_at, :updated_at]
		else
			render json: {"error"=> "La categoria no existe"}
		end
	end

	def delete
		category = Category.find(params[:id].to_i)
		category.destroy
		render json: category
	end

	private

	def permit
		params.permit(:name)
	end
end


