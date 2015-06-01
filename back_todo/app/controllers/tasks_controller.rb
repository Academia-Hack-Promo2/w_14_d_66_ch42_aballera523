class TasksController < ApplicationController

	def index		
		if Task.all 
			task = Task.all
			render json: task, :except => [:created_at, :updated_at, :category_id], :include => [:category => {:except =>[:created_at, :updated_at]}]
		else
			render json: {"Mensaje":"No Hay Tareas Que Mostrar"}
		end
	end

	def create
		task = Task.new(permit)

		if task.category_id == nil
			task.category_id = 1			
		end
		if task.valid?
			task.save
			render json: task, :except => [ :category_id, :created_at, :updated_at], :include	 => [:category => {:except =>[:created_at, :updated_at]}]
		else
			render json: {"id":nil, "error":"Mensaje de error "}			
		end
	end

	def update		
		if Task.exists?(params[:id])
			task = Task.update(params[:id], permit)
			render json: task, :include => [:category => {:except =>[:created_at, :updated_at]}], :except => [ :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def show		
		if Task.exists?(params[:id])
			task = Task.find(params[:id])
			render json: task, :except =>[:created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end	
	end

	def edit_status
		if Task.exists?(params[:id])
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def edit_priority
		if Task.exists?(params[:id])
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :status, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end
	
	def destroy		
		if Task.exists?(params[:id])
			task = Task.find(params[:id])
		else
			render json: {"result":false, "error":"Mensaje de error"}
		end
		task.delete
		render json: {"result":true}
	end

	private

	def permit
		params[:status] = params[:status].nil? ? nil : params[:status].to_i
		params[:priority] = params[:priority].nil? ? nil : params[:priority].to_i
		params[:category_id] = params[:category_id].nil? ? nil : params[:category_id].to_i
		params.permit(:title, :status, :date, :priority, :category_id)
	end
end
