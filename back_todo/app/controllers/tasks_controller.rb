class TasksController < ApplicationController

	def index		
    if Task.all 
    	task = Task.all
		  render json: task, :except => [:created_at, :updated_at]
    else
      render json: {"Mensaje":"No Hay Tareas Que Mostrar"}
    end

	end

	def create
		task = Task.new(permit)
		if task.category_id == nil
			category =	Category.find_by name: 'uncategorized'
			if category
				task.category_id = category.id			
			else
				category = Category.new
				category.name = 'uncategorized'
				category.save
				task.category_id = category.id
			end
		end
		if task.valid?
			task.save
			render json: task, :except => [:title, :status, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}			
		end
	end

	def update		
		if Task.exists?(params[:id].to_i)
			task = Task.update(params[:id].to_i, permit)
			render json: task, :except => [:title, :status, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def show		
		if Task.exists?(params[:id].to_i)
			task = Task.find(params[:id].to_i)
			render json: task, :except =>[:created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end	
	end

	def edit_status
		if Task.exists?(params[:id].to_i)
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def edit_priority
		if Task.exists?(params[:id].to_i)
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :status, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end
	
	def destroy		
    if Task.exists?(params[:id].to_i)
    	Task.find(params[:id].to_i).delete
			render json: {"result":true}
		else
			render json: {"result":false, "error":"Mensaje de error"}
		end
	end

	private

	def permit
		params.permit(:title, :status, :date, :priority, :category_id)
	end
end
