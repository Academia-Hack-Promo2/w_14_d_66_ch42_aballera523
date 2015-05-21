class TasksController < ApplicationController

	def index
		task = Task.all 
		render json: task, :except => [:created_at, :updated_at]
	end

	def create
		task = Task.new(permit)
		if task.category_id == nil
			category =	Category.find_by name: 'uncategorised'
			if category
				task.category_id = category.id			
			else
				category = Category.new
				category.name = 'uncategorised'
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
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.update(params[:id].to_i, permit)
			render json: task, :except => [:title, :status, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def show
		valid = Task.find(params[:id].to_i)
		if valid
			render json: valid, :except =>[:created_at, :updated_at]
		else
			render json: {"Error" => "La Tarea No Existe"}
		end	
	end

	def updateStatus
		if Task.exists?(params[:id].to_i)
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"Error" => "La Tarea No Existe"}
		end
	end
	
	def destroy
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.find(params[:id].to_i)
			task.delete
			render json: {"Mensaje" => "La Tarea Fue Eliminada"}
		else
			render json: {"Error" => "La Tarea No Existe"}
		end
	end

	private

	def permit
		params.permit(:title, :status, :date, :priority, :category_id)
	end
end
