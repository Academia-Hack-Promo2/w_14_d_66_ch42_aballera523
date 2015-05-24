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
    if Category.exists?(params[:id])
      valid = Category.find(params[:id])
      valid = Category.update(params[:id],permit)
      render json: valid , :except =>[:created_at, :updated_at]
    else
      render json: {"id":nil, "error":"Mensaje de error "}
    end 
  end

	def index    
    if Category.all
    	categories = Category.all
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
			render json: {"id":nil, "error":"Mensaje de error "}
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
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def delete		
		if Category.exists?(params[:id])
			Category.find(params[:id]).destroy
			render json: {"Mensaje" => "La Categoría Fue Borrada y Sus Tareas Enviadas a Uncategorized"}
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	private

	def permit
		params.permit(:name)
	end
end


